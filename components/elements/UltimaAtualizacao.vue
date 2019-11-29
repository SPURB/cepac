<template>
  <div class="ultima-atualizacao">
    div.ultima-atualizacao
  </div>
</template>
<script>
export default {
  name: 'UltimaAtualizacao',
  props: {
    dataIsoArr: {
      type: Array,
      required: true,
      note: "coleção de datas. Ex. ['2019-11-19T15:35:36.893706','2019-11-19T15:35:36.893706']"
    }
  }
  // computed: {
  //   lastUpdate () {
  //     const gmt = (str) => {
  //       const dt = str.split(/[: T-]/).map(parseFloat)
  //       return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0)
  //     }

  //     return this.dataIsoArr
  //       .sort((a, b) => gmt(a) < gmt(b))[0]
  //   }
  // }
}
</script>
