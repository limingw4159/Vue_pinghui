<template>
  <div>
    <h1>params:{{ $route.params.keyword }}</h1>
    <h1>query:{{ $route.query.k }}</h1>
    <p>I am search</p>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["keyword", "k"],
};
</script>

<style></style>
