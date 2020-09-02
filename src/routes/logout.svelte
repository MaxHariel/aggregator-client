<script> 
import {beforeUpdate} from 'svelte';
import { goto } from "@sapper/app";
   beforeUpdate(async ()=>{
       sessionStorage.clear('jwt')
       goto('/')
   })
</script>