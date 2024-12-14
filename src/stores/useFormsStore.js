import { defineStore } from "pinia";
import { computed, ref } from "vue";
import socket from "@/services/socket";


const useForms = defineStore("forms-store", () => {
  /*
    state
  */
  const sides = ref([]);

  const selected_side = ref(
    JSON.parse(localStorage.getItem("selected_side")) || 0
  );

  const current_side = ref(
    JSON.parse(localStorage.getItem("current_side")) || ""
  );

  const student_choice = ref(
    JSON.parse(localStorage.getItem("student_choice")) || 0
  );

  const side_forms = ref(JSON.parse(localStorage.getItem("side_forms")) || []);

  /*
    actions
  */
  const setSides = (all_sides) => {
    sides.value = all_sides;
  };

  const selectSide = (side_id) => {
    socket.emit("select_side", { side_id });

    selected_side.value = side_id;
    localStorage.setItem("selected_side", JSON.stringify(side_id));
  };

  const selectForm = (form_number) => {
    student_choice.value = form_number;
    localStorage.setItem("student_choice", JSON.stringify(form_number));

    socket.emit("select_form", { side_id: selected_side.value, form_number });

    localStorage.removeItem("side_forms");
  };

  const resetStore = () => {
    selected_side.value = 0;
    current_side.value = "";
    side_forms.value = [];
    student_choice.value = 0;

    localStorage.removeItem("selected_side");
    localStorage.removeItem("current_side");
    localStorage.removeItem("side_forms");
    localStorage.removeItem("student_choice");
  };

  const chooseAnotherStudent = () => {
    resetStore();
    socket.emit("reset_values");
  };

  /*
    getters
  */

  const getCurrentSideForms = computed(() => {
    return side_forms.value?.length > 0
      ? side_forms.value
      : "لم يتم اختيار الجانب بعد يرجى الإنتظار...";
  });

  /* */
  return {
    sides,
    selected_side,
    current_side,
    student_choice,
    side_forms,
    getCurrentSideForms,
    setSides,
    selectSide,
    selectForm,
    resetStore,
    chooseAnotherStudent,
  };
});

export default useForms;
