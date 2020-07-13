<template>
  <div class="settings">
   <div class="container pt-4">
      <div class="row m-2">
        <div class="form-group">
          <label for="bellDurationhInput">Продолжительность звонка в секундах</label>
          <input type="number" class="form-control" id="ringLengthInput" placeholder="10" v-model="settings[1].value">
        </div>
        
      </div>
      <div class="row m-2">
        <div class="form-group">
          <label for="ipServerInput">IP-адрес сервера</label>
          <input type="text" class="form-control" id="ipServerInput" placeholder="192.168.100.2" v-model="settings[0].value"> 
        </div>
      </div>
      <div class="row m-2">
        <div class="form-group">
          <label for="ipEspInput">IP-адрес устройства</label>
          <input type="text" class="form-control" id="ipEspInput" placeholder="192.168.100.2" v-model="settings[2].value"> 
        </div>
      </div>
      <div class="row m-2 pt-2">
        <button class="btn btn-success" @click="saveSettings()">Сохранить</button>
        <!-- <button class="btn btn-info ml-2" @click="sendSettingsToDevice()">Отправить на устройство</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["apiInfo", "settings"],
  name: "Settings",
  data() {
    return {
      profilesBackup: null,
      selectedProfile: null,
      newRingsAt: null
    };
  },
  methods: {
    saveSettings() {
      this.axios.patch(`${this.apiInfo}settings`, this.settings).then(response => {
        console.log("POST settings response:", response.data);
      });
    },
    sendSettingsToDevice() {
      // this.axios.post(`${this.apiInfo}settings`, this.settings).then(response => {
      //   console.log("POST settings response:", response.data);
      // });
    }
  },
  mounted(){
    console.log(this.settings);
    
  }
};
</script>

