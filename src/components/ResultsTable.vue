<template>
  <table class="result-table">
    <caption>
      Top results (less is better)
    </caption>
    <thead>
      <tr>
        <th>Name</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(result, i) in data" :key="i">
        <td>
          {{ result.name }}
        </td>
        <td>
          {{ result.score }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ResultsTable",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="less">
.result-table {
  background-color: transparent;
  border-collapse: collapse;
  box-shadow: 5px 5px 20px 0 #e4d4f4;
  margin-left: auto;
  margin-right: auto;
  width: 15vw;
  width: clamp(320px, 15vw, 600px);

  caption {
    font-size: 1.15rem;
    margin-bottom: 10px;
  }

  th {
    background-color: #2c3e50;
    color: #fff;
  }

  th,
  td {
    padding: 4px;
  }

  td {
    background-color: #fff;
  }

  tr:nth-child(2n) {
    td {
      background-color: lighten(#e4d4f4, 5);
    }
  }

  thead {
    th:first-of-type {
      border-top-left-radius: 6px;
    }
    th:last-of-type {
      border-top-right-radius: 6px;
    }
  }

  tr:last-of-type {
    td:first-of-type {
      border-bottom-left-radius: 6px;
    }
    td:last-of-type {
      border-bottom-right-radius: 6px;
    }
  }
}
</style>
