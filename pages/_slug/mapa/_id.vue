<template xmlns:>
  <div class="mapa main--content">
    <preloader :is-fetching="fetching" :error="error" />
    <page-title v-if="displaySubHeader" :two-columns="true">
      <div class="col-1">
        <h1>Operação Urbana Consorciada Faria Lima</h1>
        <h2>Lei 13.769/04, alterada pelas leis 13.871/04, 15.519/11 e 16.242/15</h2>
      </div>
      <div class="col-2">
        <p>Fontes:</p>
        <ul>
          <li class="fonte">
            <a href="https://servicos.spurbanismo.sp.gov.br/geo/api/mapa/1">Dados geográficos</a>
          </li>
          <li class="fonte">
            <a href="https://servicos.spurbanismo.sp.gov.br/cepacs/api/fila">Cadastro</a>
          </li>
        </ul>
      </div>
      <custom-select
        :options="[
          {
            title: 'Selecione uma base',
            value: 0
          },
          {
            title: 'Preto e branco',
            value: 1
          },
          {
            title: 'Open Street Map',
            value: 2
          }
        ]"
        @optionValue="getValueOption"
        :selectedIndex="1"
        class="mapa__select"
        title="Base do mapa"
      />
    </page-title>
    <button-section-toggler :state="displaySubHeader" @ButtonSectionTogglerAction="changeDisplaySubHeader" />

    <vl-map
      ref="map"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      @mounted="onMapMounted"
      :rotation="0"
      data-projection="EPSG:4326"
      style="height: calc(100vh - 300px)"
    >
      <vl-view
        :zoom.sync="zoom"
        :center.sync="center"
        projection="EPSG:4326"
      />

      <vl-layer-tile>
        <vl-source-stamen
          v-if="typeMap === 1"
          layer="toner"
          projection="EPSG:4326"
        />
        <vl-source-osm v-else />
      </vl-layer-tile>

      <vl-layer-vector v-if="isLoaded" :id="'vector-layer'">
        <vl-source-vector :features.sync="features" />

        <vl-style-box>
          <vl-style-stroke
            :width="2"
            color="rgba(49, 159, 211, 1)"
          />
          <vl-style-fill color="rgba(49, 159, 211, 0.1)" />
        </vl-style-box>

        <!-- interactions -->
        <vl-interaction-select :features.sync="selectedFeatures">
          <template slot-scope="select">
            <vl-overlay
              v-for="feature in select.features"
              :key="feature.id"
              :id="feature.id"
              :position="findPointOnSurface(feature.geometry)"
              :auto-pan="true"
              :auto-pan-animation="{ duration: 300 }"
              class="mapa__feature-popup"
            >
              <template>
                <section class="mapa__card">
                  <header class="mapa__card-header">
                    <a
                      @click="selectedFeatures = selectedFeatures.filter(f => f.id !== feature.id)"
                      class="mapa__card-header-icon"
                      title="Close"
                    >
                      <div>Fechar</div>
                    </a>
                  </header>
                  <div class="mapa__card-content">
                    <p v-if="filaFetching" class="mapa__card-content--fetching">
                      Procurando cadastro...
                    </p>
                    <div v-else>
                      <ul v-if="isFound">
                        <li>
                          <span>Status:</span>
                          {{ filaFound.Status ? filaFound.Status.Nome : 'Não informado.' }}
                        </li>
                        <li>
                          <span>Tipo do pedido:</span>
                          {{ filaFound.TipoPedido || 'Não informado.' }}
                        </li>
                        <li>
                          <span>Interessado:</span>
                          {{ filaFound.Interessado || 'Não informado.' }}
                        </li>
                        <li>
                          <span>Certidão:</span>
                          {{ filaFound.Certidao || 'Não informado.' }}
                        </li>
                        <li>
                          <span>Proposta:</span>
                          {{ filaFound.CodigoProposta || 'Não informado.' }}
                        </li>
                        <li>
                          <span>Endereço:</span>
                          {{ filaFound.Endereco || 'Não informado.' }}
                        </li>
                        <li>
                          <span>Setor:</span>
                          {{
                            filaFound.SetorObj ? filaFound.SetorObj.OperacaoUrbana.Nome : 'Não informado'
                          }}
                        </li>
                        <li>
                          <span>Subsetor:</span>
                          {{ filaFound.SubSetor || 'Não informado.' }}
                        </li>
                        <li>
                          <span>Zona:</span>
                          {{ filaFound.Zona || 'Não informado.' }}
                        </li>
                      </ul>
                      <p v-else>
                        {{ filaFound }}
                      </p>
                    </div>
                  </div>
                </section>
              </template>
            </vl-overlay>
          </template>
        </vl-interaction-select>
      <!-- interactions -->
      </vl-layer-vector>
    </vl-map>

    <footer-actions
      :pdf-doc-definition="{}"
      :csv-doc-definition="[]"
      :json-doc-definition="[]"
      :geojson-doc-definition="features"
      :file-name="fileName"
      :go-back-path="'/ouc-faria-lima'"
      :go-forward="{ path:'/ouc-faria-lima/resumo', text:'Resumo' }"
      :which-show="[4, 5]"
    />
  </div>
</template>
<script>
import ZoomSlider from 'ol/control/ZoomSlider'
import ScaleLine from 'ol/control/ScaleLine'
import CustomSelect from '@/components/elements/CustomSelect'
import PageTitle from '@/components/sections/PageTitle'
import FooterActions from '@/components/sections/FooterActions'
import Preloader from '@/components/sections/Preloader'
import { findPointOnSurface } from 'vuelayers/lib/ol-ext'

export default {
  name: 'MapaOUCFL',
  components: {
    CustomSelect,
    PageTitle,
    FooterActions,
    Preloader
  },
  data () {
    return {
      zoom: 13.5,
      center: [ -46.685461, -23.585462 ],
      features: [],
      selectedFeatures: [],
      error: false,
      fetching: false,
      isLoaded: false,
      mapLoaded: false,
      filaFetching: false,
      isFound: true,
      typeMap: 1,
      filaFound: {},
      displaySubHeader: true
    }
  },
  computed: {
    mapId () { return this.$route.params.id },
    fileName () {
      return `${this.$route.path.split('/')[1]}-${this.$route.path.split('/')[2]}`
    }
  },
  watch: {
    selectedFeatures (features) {
      if (features.length) {
        this.searhAnddisplayFila(features)
      }
    }
  },
  async created () {
    const { $geo, mapId } = this
    this.fetching = true
    try {
      const { data } = await $geo(`mapas/${mapId}`)
      this.features = data.features
    }
    catch (e) {
      this.error = e
    }
    finally {
      this.fetching = false
    }
  },
  methods: {
    findPointOnSurface,
    async onMapMounted () {
      await this.$refs.map.$map.getControls().extend([
        new ScaleLine(),
        new ZoomSlider()
      ])
      this.isLoaded = true
    },
    async searhAnddisplayFila (features) {
      const { id } = features[0].properties
      this.filaFetching = true
      try {
        const { data } = await this.$cepacs.get(`fila/${id}`)
        this.filaFound = data
        this.isFound = true
      }
      catch {
        this.filaFound = 'Certidão da Lei 11.732/1995'
        this.isFound = false
      }
      finally {
        this.filaFetching = false
      }
    },
    getValueOption (option) {
      this.typeMap = option
    },
    changeDisplaySubHeader (state) {
      this.displaySubHeader = state
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/variables';
.mapa {
  &__select {
    margin-top: 1rem;
  }
  &__card {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    border: solid 1px $grey-2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    &-header {
      a {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        color: #EB5757;
        font-weight: 700;
        cursor: pointer;
      }
    }
    &-content {
      ul span {
        font-weight: 700;
      }
    }
  }
}
</style>
