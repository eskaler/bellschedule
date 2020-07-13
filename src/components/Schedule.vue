<template>
  <div class="schedule" v-if="loaded">
    <!-- <h1>Schedule</h1> -->
    <div class="container pt-4">
      <div class="row m-2">
        <div v-for="(day, index) in days" :key="day.id" class="m-1">
          <h5>{{dayNames[index]}}</h5>
          <select
            name
            id
            @change="onProfileChange($event, day)"
            v-model.number="day.profileId"
            class="form-control"
          >
            <option v-for="(profile, index) in profiles" :key="index" :value="profile.id">
              <!-- :selected="day.profileId==profile.id ? 'selected' : ''"> -->
              {{profile.name}}
            </option>
          </select>
        </div>
      </div>
      <div class="row m-2 pt-4">
        <button class="btn btn-success" @click="saveSchedule()">Сохранить</button>
        <button class="btn btn-info ml-2" @click="sendScheduleToDevice()">Отправить на устройство</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["apiInfo", "days", "profiles"],
  name: "Schedule",
  data() {
    return {
      dayNames: [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье"
      ],
      loaded: true
    };
  },
  methods: {
    onProfileChange(event, day) {
      day.profileId = event.target.value;
    },
    saveSchedule() {
      this.axios.post(`${this.apiInfo}days`, this.days).then(response => {
        console.log("POST days response:", response.data);
      });
    },
    sendScheduleToDevice() {
      this.saveSchedule();
      this.axios.get(`${this.apiInfo}schedule/esp`).then(response =>{
        console.log(response.data);
      })
      // let deviceSchedule = [];
      // this.days.forEach(day => {
      //   console.log(day.profileId);
      //   if (day.profileId == null) {
      //     deviceSchedule.push([]);
      //   } else {
      //     let bells = this.profileToArray(day.profileId);
      //     console.log("got bells:", bells);
      //     deviceSchedule.push(bells);
      //   }
      // });
      // this.axios.post(`${this.apiInfo}scheduleTest`, this.days);
      // // this.axios.post("http://192.168.100.10/schedule", { "schedule" : deviceSchedule});
      // console.log(deviceSchedule);
    },
    profileToArray(profileId) {
      let bells = [];
      this.profiles.forEach(profile => {
        if (profile.id == profileId) {
          console.log(profile.id, profileId);
          profile.Bells.forEach(bell => {
            bells.push(bell.ringsAt);
          });
          console.log("bells", bells);
        }
      });
      return bells;
    }
  },
  mounted() {}
};
</script>

