<script setup>
import socket from "@/services/socket";
import useFormsStore from "@/stores/useFormsStore.js";
import { storeToRefs } from "pinia";
//
/*
  store
*/
const { student_choice, selected_side, current_side, side_forms } = storeToRefs(
  useFormsStore()
);

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
    side_forms.value = [...data.result];

    localStorage.setItem("side_forms", JSON.stringify(side_forms.value));
    localStorage.setItem("selected_side", JSON.stringify(selected_side.value));
    localStorage.setItem("current_side", JSON.stringify(current_side.value));
  });

  socket.on("get_selected_form", (data) => {
    if (data.code == 404) {
      console.log(data.error);
      return;
    }

    student_choice.value = data.form_number;
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
              <h1 class="mt-5">
                {{ "الجانب: " + current_side }}
              </h1>
            </div>
          </v-card-title>
          <v-card-text>
            <v-row
              v-if="student_choice"
              class="ga-2 justify-center align-center"
              no-gutters
            >
              <v-col cols="4">
                <v-card
                  variant="flat"
                  rounded="lg"
                  color="#003A4C"
                  class="pa-5"
                  ripple
                >
                  <v-card-item>
                    <h1>
                      {{ "نموذج المتسابق: " + student_choice }}
                    </h1>
                  </v-card-item>
                </v-card>
                <!--  -->

                <v-btn
                  v-tooltip:bottom="
                    'اضغط لاختيار متسابق اخر, لا يمكن التراجع عن هذا الامر'
                  "
                  @click="form_store.chooseAnotherStudent()"
                  :to="{ name: 'examer-view' }"
                  class="mt-10"
                  variant="outlined"
                  color="#003A4C"
                  height="50"
                  block
                >
                  <h2>اختيار متسابق اخر</h2>
                </v-btn>
              </v-col>
            </v-row>
            <!--  -->

            <v-row v-else class="ga-2 justify-center align-center" no-gutters>
              <v-col>
                <span class="d-inline-block">
                  <h2 class="text-white mt-5">
                    <span
                      v-if="student_choice == 0 && side_forms?.length > 0"
                      class="pa-3 rounded-lg"
                      style="background-color: #003a4c"
                    >
                      {{ "لم يتم اختيار النموذج من قبل المتسابق بعد..." }}
                    </span>
                    <span
                      v-else
                      class="pa-3 rounded-lg"
                      style="background-color: #003a4c"
                    >
                      {{ "تم اختيار كل نماذج هذا الجانب!" }}
                    </span>
                  </h2>

                  <v-btn
                    @click="form_store.chooseAnotherStudent()"
                    :to="{ name: 'examer-view' }"
                    class="mt-10"
                    variant="outlined"
                    color="#003A4C"
                    height="50"
                    block
                  >
                    <h2 v-if="side_forms?.length != 0">اختيار نموذج اخر</h2>
                    <!--  -->

                    <h2 v-else>رجوع</h2>
                  </v-btn>
                </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
