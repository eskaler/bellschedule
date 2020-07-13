<template>
  <div class="profiles" v-if="loaded">
    <!-- <h1>Profiles</h1> -->
    <div class="container pt-4">
      <div class="row m-2">
        <div class="m-2">
          <select class="form-control" name id @change="onProfileChange($event)">
            <option
              v-for="(profile, index) in profiles"
              :key="index"
              :value="index"
              selected
            >{{profile.name}}</option>
          </select>
        </div>
        <div class="m-2">
          <button
            class="btn btn-success"
            v-if="selectedProfile == null"
            @click="createProfile"
          >Создать профиль</button>
        </div>
        <div class="m-2" v-if="selectedProfile != null">
          <input class="form-control" type="text" v-model="selectedProfile.name" name id />
          <input class="form-control" type="time" v-model="newRingsAt" name id />
          <button class="btn btn-primary" @click="createBell()">Добавить</button>
        </div>
      </div>

      <div class="m-2">
        <table class="table" v-if="selectedProfile != null">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Время</th>
              <th scope="col">Удалить</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bell, index) in selectedProfile.Bells" :key="index">
              <th scope="row">{{index + 1}}</th>
              <td>{{bell.ringsAt}}</td>
              <td>
                <a href="#" @click="deleteBell(index)">Удалить</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="m-2">
        <button
          class="btn btn-success"
          v-if="selectedProfile != null"
          @click="saveProfile()"
        >Сохранить профиль</button>
        <button
          class="btn btn-info ml-2"
          v-if="selectedProfile != null"
          @click="cancelProfile()"
        >Закрыть</button>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  props: ["apiInfo", "profiles"],
  name: "Profiles",
  data() {
    return {
      loaded: true,
      profilesBackup: null,
      selectedProfile: null,
      newRingsAt: null
    };
  },
  methods: {
    onProfileChange(event) {
      console.log(event.target.value);
      this.selectedProfile = JSON.parse(
        JSON.stringify(this.profiles[event.target.value])
      );
    },
    deleteBell(index) {
      console.log("Deleting bell: ", index);
      if (this.selectedProfile.bellsToDelete == undefined)
        this.selectedProfile.bellsToDelete = [];
      this.selectedProfile.bellsToDelete.push(
        this.selectedProfile.Bells[index].id
      );
      this.selectedProfile.Bells.splice(index, 1);
      this.sortBells();
    },
    createBell() {
      if (this.newRingsAt != null) {
        console.log("Adding bell: ", this.newRingsAt);
        this.selectedProfile.Bells.push({
          ringsAt: this.newRingsAt
        });
        this.sortBells();
        this.newRingsAt = null;
        return;
      }
      console.log("Cannot create null bell!");
    },
    createProfile() {
      this.selectedProfile = {
        name: "Новый профиль",
        Bells: []
      };
    },
    cancelProfile() {
      this.selectedProfile = null;
    },
    saveProfile() {
      if (this.selectedProfile.id == undefined) {
        this.axios
          .post(`${this.apiInfo}profiles`, this.selectedProfile)
          .then(response => {
            console.log(response.data);
          });
      } else {
        this.axios
          .patch(`${this.apiInfo}profiles`, this.selectedProfile)
          .then(response => {
            console.log(response.data);
          });
      }
    },
    sortBells() {
      if (this.selectedProfile.Bells.length > 1) {
        this.selectedProfile.Bells.sort(function(a, b) {
          return (
            new Date("1970/01/01 " + a.ringsAt) -
            new Date("1970/01/01 " + b.ringsAt)
          );
        });
      }
    }
  },
  mounted() {
    // this.profilesBackup = JSON.parse(JSON.stringify(this.profiles)); ;
  }
};
</script>

