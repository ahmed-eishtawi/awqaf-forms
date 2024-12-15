<script setup>
import { ref } from "vue";

//

/*
  models
*/
const loading = ref(false);

/*
  methods
*/
const restoreDatabase = async () => {
  loading.value = true;
  try {
    const res = await fetch("http://localhost:3500/api/restore-database", {
      method: "GET",
    });
    if (res.ok) {
      console.log("done");
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
//
</script>

<template>
  <v-row class="h-screen justify-center align-center" no-gutters>
    <v-col class="text-center">
      <v-card class="bg-transparent" flat>
        <v-card-item>
          <v-card-title class="d-flex justify-center mb-5">
            <div>
              <v-img src="../assets/awqaf-logo.svg" width="500" class="mb-5" />
            </div>
          </v-card-title>
          <v-card-text>
            <v-row class="ga-2 justify-center align-center" no-gutters>
              <v-col>
                <v-card variant="flat">
                  <v-card-item>
                    <v-btn
                      @click="restoreDatabase"
                      :loading="loading"
                      variant="outlined"
                      color="#003A4C"
                      height="60"
                    >
                      <h1>استعادة قاعدة البيانات</h1>
                    </v-btn>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
