<script>
import FormEjercicios from "./FormEjercicios";

export default {
  data: () => ({
    valid: true,
    name: "",
    description: "",
    materials: "",
    rules: [(v) => !!v || "Debe completar la información"],
    select: null,
  }),
  components: {
    FormEjercicios,
  },

  methods: {
    createRoutine: function() {
      this.axios

          .post(UserApi.baseUrl + "/routines/1/cycles/1/exercises/" + id + "/images", {
            name: this.name,
            detail: this.description,
            isPublic: true,
            difficulty: "rookie",
            category: this.materials,
          })
          .then((response) => {
            console.log(response);
          })
    }
  }

};
</script>
