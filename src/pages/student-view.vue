<script setup>
import socket from "@/services/socket";
import useFormsStore from "@/stores/useFormsStore.js";
import { storeToRefs } from "pinia";
//
/*
  store
*/
const {
  getCurrentSideForms,
  selected_side,
  current_side,
  student_choice,
  side_forms,
} = storeToRefs(useFormsStore());

const form_store = useFormsStore();

/*
  lifecycle hooks
*/
onMounted(() => {
  if (!socket.socket.connected) {
    socket.connect();
  }
  socket.on("connect", () => {
    console.log("connected");
  });

  socket.on("get_selected_side", (data) => {
    if (data.code == 404) {
      console.log(data.error);
      return;
    }
    selected_side.value = data.selected_side.id;
    current_side.value = data.selected_side.title;
    side_forms.value = data.result;

    localStorage.setItem("selected_side", JSON.stringify(selected_side.value));
    localStorage.setItem("current_side", JSON.stringify(current_side.value));
    localStorage.setItem("side_forms", JSON.stringify(side_forms.value));
  });

  socket.on("choose_another_student", () => {
    form_store.resetStore();
  });
});
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
              <h1 v-if="student_choice == 0" class="mt-5">
                الرجاء اختيار النموذج
              </h1>
              <h1 v-else class="mt-5">
                لقد اخترت النموذج رقم: {{ student_choice }}
              </h1>
            </div>
          </v-card-title>
          <!--  -->

          <v-card-text v-if="student_choice != 0">
            <v-row class="ga-2 justify-center align-center" no-gutters>
              <v-col cols="12">
                <h2 class="text-white mt-5">
                  <span
                    class="pa-3 rounded-lg"
                    style="background-color: #003a4c"
                  >
                    الجانب: {{ current_side }}
                  </span>
                </h2>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text v-else>
            <v-row
              v-if="
                getCurrentSideForms?.length > 0 &&
                typeof getCurrentSideForms === 'object'
              "
              class="ga-2 flex-wrap justify-center align-center"
              no-gutters
            >
              <v-col
                cols="2"
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
