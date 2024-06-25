<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-img
          src="./assets/Weather.png"
          style="
            width: 50px;
            height: 50px;
            margin-right: -12px;
            filter: brightness(0) invert(1);
          "
          fit="contain"
        />
        <q-toolbar-title> Widget Cuaca </q-toolbar-title>
        <div class="q-pa-md q-gutter-sm flex-between aa">
          <div class="right">
            <q-btn-dropdown
              flat
              label="Tugas ShahReza"
              color="blue-indigo-5"
              text-color="white"
              size="1rem"
              dense
            >
              <q-list style="min-width: 160px">
                <q-item
                  v-for="task in tasks"
                  :key="task.id"
                  clickable
                  v-ripple
                  @click="openProject(task.url)"
                >
                  <q-item-section>{{ task.name }}</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div
        id="app"
        :class="
          typeof weather.main != 'undefined' && weather.main.temp > 19
            ? 'warm'
            : ''
        "
      >
        <main>
          <div class="search-box">
            <input
              type="text"
              class="search-bar"
              placeholder="Cari Lokasi Disini..."
              v-model="query"
              @keypress="fetchWeather"
            />
          </div>
          <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
            <div class="location-box">
              <div class="location">
                {{ weather.name }}, {{ weather.sys.country }}
              </div>
              <div class="date">{{ dateBuilder() }}</div>
            </div>
            <div class="weather-box">
              <div class="temp">{{ Math.round(weather.main.temp) }}°c</div>
              <div class="weather">{{ weather.weather[0].main }}</div>
            </div>
          </div>
        </main>
      </div>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>&copy Muhammad Shahreza Khadafi || UAS || 2024</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      api_key: "5de24096a7c0b6e045023fe4b3a4ca9f",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
      tasks: [
        {
          id: 1,
          name: "Tugas1",
          url: "https://tugas1-pbk-223510486.vercel.app/",
        },
        {
          id: 2,
          name: "Tugas2",
          url: "https://shahreza-project-assignment2.vercel.app/",
        },
        {
          id: 3,
          name: "Tugas3",
          url: "https://tugas3-apptodolist-crud.vercel.app/",
        },
        {
          id: 4,
          name: "Tugas4",
          url: "https://tugas4-component.vercel.app/",
        },
        {
          id: 5,
          name: "Tugas5",
          url: "https://tugas5-quasar.vercel.app/",
        },
        {
          id: 6,
          name: "Tugas6",
          url: "https://tugas6-shahreza.vercel.app/",
        },
        {
          id: 7,
          name: "Tugas7",
          url: "https://shahreza-tugas7-pbk-223510486.vercel.app/",
        },
      ],
    };
  },
  methods: {
    openProject(url) {
      window.open(url, "_blank");
    },
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`
        )
          .then((res) => {
            return res.json();
          })
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "montserrat", sans-serif;
  overflow-y: hidden;
}

#app {
  background-image: url("./assets/cold1.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

#app.warm {
  background-image: url("./assets/warm-bg1.jpg");
}

main {
  min-height: 100vh;
  padding: 25px;

  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;

  color: 313131;
  font-size: 20px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.location-box .location {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 102px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;

  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.bg-primary {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.bg-grey-8 {
  text-align: center;
}
</style>
