<script setup>
//
import useFormsStore from "@/stores/useFormsStore.js";
import { storeToRefs } from "pinia";

const { sides } = storeToRefs(useFormsStore()); /* make the sides reactive */

const form_store = useFormsStore();
</script>

<template>
  <v-row class="h-screen justify-center align-center" no-gutters>
    <v-col class="text-center">
      <v-card class="bg-transparent" flat>
        <v-card-item>
          <v-card-title class="d-flex justify-center mb-5">
            <div>
              <v-img src="../assets/awqaf-logo.svg" width="500" class="mb-5" />
              <h1 class="mt-5">الرجاء اختيار الجانب</h1>
            </div>
          </v-card-title>
          <v-card-text>
            <v-row class="ga-2 justify-center align-center" no-gutters>
              <v-col cols="6" v-for="form in sides" :key="form.title">
                <v-card
                  @click="form_store.selectSide(form.id)"
                  :to="{ name: 'student-choice', params: { id: form.id } }"
                  variant="flat"
                  rounded="lg"
                  color="#003A4C"
                  class="pa-5"
                  ripple
                >
                  <v-card-item>
                    <h1>
                      {{ form.title }}
                    </h1>
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
