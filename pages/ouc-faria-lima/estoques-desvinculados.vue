<template>
  <div class="container">
    <div class="icon">
      <oficio :fill="'#038375'" />
    </div>
    <h2>
      Estoques desvinculados
    </h2>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Oficio from '~/components/icons/Oficio.vue'

export default {
  components: {
    Oficio
  },
  data () {
    return {
      fila: []
    }
  },
  head () {
    return {
      title: 'OUC Faria Lima | Estoques desvinculados',
      meta: [{ hid: 'relatorios', name: 'relatorios', content: "Operação Urbana Consorciada Faria Lima CEPAC'S desvinculados" }]
    }
  },
  asyncData: ({ params }) => axios.get(`/filacepac/api/fila/?IdStatus=`)
    .then((res) => { return { fila: res.data } })
    .catch((e) => { return { error: e } })
}
</script>
