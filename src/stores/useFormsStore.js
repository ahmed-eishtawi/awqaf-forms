import { defineStore } from "pinia";
import { computed, ref } from "vue";
import useBroadcastChannel from "@/composables/broadcast-channel";

const channel = useBroadcastChannel();

const useForms = defineStore("forms-store", () => {
  /*
    state
  */
  const sides = ref(
    (
      JSON.parse(localStorage.getItem("sides")) || [
        {
          id: 1,
          title: "جانب أصول الطيبة كاملا",
          forms: Array.from({ length: 3 }, (_, i) => i + 1),
        },
        {
          id: 2,
          title: "جانب أصول الطيبة",
          forms: Array.from({ length: 10 }, (_, i) => i + 1),
        },
        {
          id: 3,
          title: "الشاطبية مع الذرة",
          forms: Array.from({ length: 12 }, (_, i) => i + 1),
        },
        {
          id: 4,
          title: "جانب المورد",
          forms: Array.from({ length: 5 }, (_, i) => i + 1),
        },
        {
          id: 5,
          title: "جانب العقيلة",
          forms: Array.from({ length: 20 }, (_, i) => i + 1),
        },
        {
          id: 6,
          title: "جانب حفظ الشاطبية كاملا",
          forms: Array.from({ length: 15 }, (_, i) => i + 1),
        },
        {
          id: 7,
          title: "جانب حفظ باب الأصول من الشاطبية",
          forms: Array.from({ length: 24 }, (_, i) => i + 1),
        },
      ]
    ).map((side) => ({
      ...side,
      forms: Array.isArray(side.forms) ? side.forms : [],
    }))
  );

  const selected_side = ref(
    JSON.parse(localStorage.getItem("selected_side")) || 0
  );

  const student_choice = ref(
    JSON.parse(localStorage.getItem("student_choice")) || 0
  );

  /*
    actions
  */
  const selectSide = (side_id) => {
    selected_side.value = side_id;
    localStorage.setItem("selected_side", JSON.stringify(side_id));

    // Broadcast the change
    channel.broadcast({
      action: "selectSide",
      payload: side_id,
    });
  };

  const selectForm = (form_number) => {
    student_choice.value = form_number;

    sides.value.forEach((side) => {
      if (side.id == selected_side.value) {
        side.forms = side.forms.filter((form) => form !== form_number);
      }
    });

    localStorage.setItem("student_choice", JSON.stringify(form_number));
    localStorage.setItem("sides", JSON.stringify(sides.value));

    // Broadcast the change
    channel.broadcast({
      action: "selectForm",
      payload: {
        form_number,
        sides: sides.value,
      },
    });
  };

  const clearSide = () => {
    selected_side.value = 0;
    localStorage.removeItem("selected_side");
    channel.broadcast({ action: "clearSide" });
  };

  const clearForm = () => {
    student_choice.value = 0;
    localStorage.removeItem("student_choice");
    channel.broadcast({ action: "clearForm" });
  };

  // Sync incoming broadcast messages
  channel.receive((data) => {
    switch (data.action) {
      case "selectSide":
        selected_side.value = data.payload;
        localStorage.setItem("selected_side", JSON.stringify(data.payload));
        break;

      case "selectForm":
        student_choice.value = data.payload.form_number;
        sides.value = data.payload.sides;
        localStorage.setItem(
          "student_choice",
          JSON.stringify(data.payload.form_number)
        );
        localStorage.setItem("sides", JSON.stringify(data.payload.sides));
        break;

      case "clearSide":
        selected_side.value = 0;
        localStorage.removeItem("selected_side");
        break;

      case "clearForm":
        student_choice.value = 0;
        localStorage.removeItem("student_choice");
        break;

      default:
        console.warn(`Unknown action: ${data.action}`);
    }
  });

  /*
    getters
  */
  const getCurrentSideForms = computed(() => {
    if (selected_side.value == 0) {
      return "لم يتم اختيار جانب بعد يرجى الإنتظار...";
    }

    const current_side = sides.value.find(
      (side) => side.id === selected_side.value
    );

    if (!current_side) {
      return "الجانب المحدد غير موجود.";
    }

    const side_forms = current_side.forms;

    if (side_forms.length == 0) {
      return "لم يتم اختيار جانب بعد يرجى الإنتظار...";
    }

    return side_forms.map((form) => form);
  });

  return {
    sides,
    selected_side,
    student_choice,
    getCurrentSideForms,
    selectSide,
    selectForm,
    clearSide,
    clearForm,
  };
});

export default useForms;
