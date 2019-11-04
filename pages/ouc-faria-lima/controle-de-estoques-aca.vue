<template>
  <div class="container">
    <div class="icon">
      <oficio :fill="'#038375'" />
    </div>
    <h2>
      Controle de estoques ACA
    </h2>
  </div>
</template>

<script>
import Oficio from '~/components/icons/Oficio.vue'
export default {
  name: 'ControleEstoquesAca',
  components: {
    Oficio
  },
  head () {
    return {
      title: 'OUC Faria Lima | Controle de estoques de área de construção adicional - ACA',
      meta: [{ hid: 'relatorios', name: 'relatorios', content: "Operação Urbana Consorciada Faria Lima CEPAC'S desvinculados" }]
    }
  }
}
</script>
