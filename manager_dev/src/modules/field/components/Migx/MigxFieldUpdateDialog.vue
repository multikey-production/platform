<template lang="pug">
  v-card.pt-4
    v-card-text
      v-flex
        v-layout.wrap
          v-flex.md12(v-for="(field, i) in fields" :key="i")
            v-layout.mb-4
              //- Text field
              v-flex(v-if="field.interface.fieldType === 'text'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-text-field(
                  v-model="field.value"
                )

              //- Textarea field
              v-flex(v-else-if="field.interface.fieldType === 'textarea'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-textarea(
                  v-model="field.value"
                )

              //- Editor field
              v-flex(v-else-if="field.interface.fieldType === 'editor'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div.mb-3(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                editor(
                  :content="field.value"
                  @update="field.value = $event()"
                )

              //- Image field
              v-flex(v-else-if="field.interface.fieldType === 'image'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div.mb-3(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                image-field(
                  :path.sync="field.value"
                  @selectFile="field.value = $event"
                )

              //- Select field
              v-flex(v-else-if="field.interface.fieldType === 'select'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-select(
                  :items="JSON.parse(field.interface.defaultValue)"
                  v-model="field.value"
                )

              //- Date field
              v-flex(v-else-if="field.interface.fieldType === 'date'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-menu(
                  ref="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                )
                  template(v-slot:activator="{ on }")
                    v-text-field(
                      v-model="field.value"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    )
                  v-date-picker(
                    v-model="field.value"
                    no-title
                    scrollable
                    color="primary"
                  )

              //- Time field
              v-flex(v-else-if="field.interface.fieldType === 'time'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-menu(
                  ref="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                )
                  template(v-slot:activator="{ on }")
                    v-text-field(
                      v-model="field.value"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    )
                  v-time-picker(
                    format="24hr"
                    v-model="field.value"
                  )

              //- Checkbox field
              v-flex(v-else-if="field.interface.fieldType === 'checkbox'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-checkbox(
                  color="primary"
                  v-model="field.value"
                )
              
              //- Colorpicker field
              v-flex(v-else-if="field.interface.fieldType === 'colorpicker'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-color-picker(
                  v-model="field.value"
                )
    v-card-actions
      v-btn.ml-2(@click="$emit('cancel')") {{d.close}}
</template>

<script>
export default {
  name: "MigxFieldUpdateDialog",

  props: {
    fields: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
