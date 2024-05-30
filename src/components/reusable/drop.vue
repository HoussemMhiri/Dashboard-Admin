<template>
  <div class="dropdown">
  <button class="dropdown-toggle toggle_btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  {{ switchRoutes ? 'OSPF' : "EIGRP"}}
  </button>
  <ul class="dropdown-menu">
    <li><button class="dropdown-item" type="button" @click="trueSwitch">OSPF</button></li>
    <li><button class="dropdown-item" type="button" @click="falseSwitch">EIGRP</button></li>
  </ul>
</div>
</template>

<script>
export default {
    emits:['toggle_bol'],
    data(){
        return{
            switchRoutes:true,
        }
    },
    
    methods:{
        falseSwitch() {
            return this.switchRoutes= false,
            this.switchBolean()
        },
        trueSwitch() {
            return this.switchRoutes= true,
            this.switchBolean()
        },
       switchBolean(){
          this.$emit('toggle_bol',this.switchRoutes)
       }    
    } 



}
</script>

<style scoped>
.toggle_btn{
    border: none;
    background: none
}

</style>