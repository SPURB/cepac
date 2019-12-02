<template>
  <div class="ultima-atualizacao">
    <p><span>Última atualização: </span>{{ lastUpdate | dateTimeStr }}</p>
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
  },
  computed: {
    lastUpdate () {
      if (this.dataIsoArr.length) {
        return this.dataIsoArr
          .map((dateStr, index) => {
            const cleanData = dateStr
              .slice(0, 10)
              .replace(/[-]/g, '')
            return {
              num: parseInt(cleanData),
              index
            }
          })
          .reduce((acc, curr) => acc.num > curr.num ? this.dataIsoArr[acc.index] : this.dataIsoArr[curr.index])
      }
      else return 'carregando'
    }
  }
}
</script>
<style lang="scss" scoped>
.ultima-atualizacao {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
}
</style>
