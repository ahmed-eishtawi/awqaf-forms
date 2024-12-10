<script setup>
//
</script>
<template>
  <div class="bg-color">
    <v-row class="h-screen justify-center align-center bg-color" no-gutters>
      <v-col class="text-center">
        <v-card class="bg-transparent" flat>
          <v-card-item>
            <v-card-title class="d-flex justify-center mb-16">
              <div>
                <v-img
                  src="../assets/awqaf-logo.svg"
                  width="500"
                  class="mb-5"
                />
                <h1>مسابقة ليبيا المحلية</h1>
              </div>
            </v-card-title>
            <v-card-text class="d-flex justify-center align-center">
              <div class="d-flex flex-column justify-center w-50 ga-3">
                <v-btn
                  :to="'examer-view'"
                  variant="flat"
                  color="#003A4C"
                  height="70"
                  rounded="lg"
                >
                  <h1>شاشة المقرر</h1>
                </v-btn>
                <v-btn
                  :to="'student-view'"
                  variant="flat"
                  color="#003A4C"
                  height="70"
                  rounded="lg"
                >
                  <h1>شاشة الطالب</h1>
                </v-btn>
              </div>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
