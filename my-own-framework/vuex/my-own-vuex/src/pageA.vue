<template>
    <div>
        页面A被加载
    </div>
</template>

<script>
    export default {
        name: 'pageA',
        mounted() {
            setTimeout(() => {
                this.$store.dispatch('incrementAction');
            }, 5000)
            console.log('--log--:', this.$store.state.count)
        },
    }
</script>
