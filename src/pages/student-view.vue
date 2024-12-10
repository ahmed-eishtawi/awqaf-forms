<script setup>
//
import useFormsStore from "@/stores/useFormsStore.js";
import { storeToRefs } from "pinia";

const { getCurrentSideForms } = storeToRefs(useFormsStore());

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
              <h1 class="mt-5">الرجاء اختيار النموذج</h1>
            </div>
          </v-card-title>
          <v-card-text>
            <v-row
              v-if="
                getCurrentSideForms.length &&
                typeof getCurrentSideForms === 'object'
              "
              class="ga-2 justify-center align-center"
              no-gutters
            >
              <v-col
                cols="1"
                v-for="form_number in getCurrentSideForms"
                :key="form_number"
              >
                <v-card
                  v-if="form_number"
                  @click="form_store.selectForm(form_number)"
                  variant="flat"
                  rounded="lg"
                  color="#003A4C"
                  class="pa-5"
                  ripple
                >
                  <v-card-item>
                    <h1>
                      {{ form_number }}
                    </h1>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
            <!--  -->

            <v-row v-else class="ga-2 justify-center align-center" no-gutters>
              <v-col cols="12">
                <h2 class="text-white mt-5">
                  <span
                    class="pa-3 rounded-lg"
                    style="background-color: #003a4c"
                  >
                    {{ getCurrentSideForms }}
                  </span>
                </h2>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
