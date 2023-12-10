<template>
  <v-dialog max-width="700" max-height="700" :persistent="true">
    <v-form ref="createVehicleForm">
      <v-card>
        <v-card-title>
          <v-icon size="x-small" class="mr-2">
            mdi-tag-plus
          </v-icon>
          İlan Oluştur
        </v-card-title>
        <hr class="ma-0 pa-0"/>
        <v-card-text>
          <v-row>
            <v-col class="v-col-12 d-flex">
              <div v-for="(_, index) in 3" class="image-upload-container"
                   @click="uploader[`image${index+1}`].base64String !== '' ? deleteImage(index) : addImage(index)">
                <v-img
                    v-if="uploader[`image${index+1}`].base64String !== ''"
                    :src="uploader[`image${index+1}`].base64String">
                </v-img>
                <template v-else>
                  <v-icon>mdi-plus</v-icon>
                  Görsel
                  <input
                      :key="uploader[`image${index+1}`].imgKey"
                      ref="imageUploader"
                      multiple
                      class="d-none"
                      type="file"
                      id="uploadFile"
                      accept=".png,.jpg,.jpeg"/>
                </template>
              </div>
            </v-col>
            <v-col class="v-col-12 v-col-sm-6">
              <v-text-field
                  v-model="modalItem.brand"
                  density="compact"
                  label="Marka"
                  :rules="[value => !!value || 'Marka Boş Bırakılamaz']"
              ></v-text-field>
            </v-col>
            <v-col class="v-col-12 v-col-sm-6">
              <v-text-field
                  v-model="modalItem.model"
                  density="compact"
                  label="Model"
                  :rules="[value => !!value || 'Model Boş Bırakılamaz']"
              ></v-text-field>
            </v-col>
            <v-col class="v-col-12 v-col-sm-6">
              <v-text-field
                  v-model="modalItem.year"
                  density="compact"
                  label="Yıl"
                  :rules="[value => !!value || 'Yıl Boş Bırakılamaz']"
              ></v-text-field>
            </v-col>
            <v-col class="v-col-12 v-col-sm-6">
              <v-text-field
                  v-model.number="modalItem.price"
                  type="number"
                  density="compact"
                  label="Fiyat"
                  :rules="[value => !!value || 'Fiyat Boş Bırakılamaz']"
              ></v-text-field>
            </v-col>
            <v-col class="v-col-12">
              <v-textarea
                  v-model="modalItem.description"
                  density="compact"
                  label="Açıklama"
                  rows="4"
                  :no-resize="true"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn size="small" variant="elevated" color="success" class="mr-1" @click="createClicked">
            <v-icon class="mr-1">mdi-playlist-plus</v-icon>
            Oluştur
          </v-btn>
          <v-btn size="small" variant="elevated" color="error" @click="$emit('CloseModalClicked')">
            <v-icon size="small" class="mr-1">mdi-cancel</v-icon>
            Kapat
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";
import fileToBase64 from "@/core/Helpers/fileHelpers";

const emit = defineEmits();

const createVehicleForm = ref(null);

const modalItem = ref({});

const uploader = ref({
  image1: {
    imageUploader1: null,
    imgKey: 0,
    file: {},
    base64String: "",
  },
  image2: {
    imageUploader1: null,
    imgKey: 0,
    file: {},
    base64String: "",
  },
  image3: {
    imageUploader1: null,
    imgKey: 0,
    file: {},
    base64String: "",
  },
});

async function createClicked() {
  const {valid} = await createVehicleForm.value.validate();
  if (!valid) {
    return;
  }

  emit('CreateVehicle');
}

async function addImage(index) {
  const image = uploader.value[`image${index+1}`];
  document.getElementById("uploadFile").click();
  document.getElementById("uploadFile").addEventListener("change", async (event) => {
    image.imgKey++;
    if (event.target.files.length === 1) {
      image.file = event.target.files[0];
      image.base64String = await fileToBase64(image.file);
    }
  });
}

function deleteImage(index) {
  const image = uploader.value[`image${index+1}`];
  image.file = {};
  image.base64String = "";
}

</script>

<style lang="scss">
.image-upload-container {
  width: 100px;
  height: 100px;
  margin-right: 16px;
  border: 1px solid grey;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .v-img {
    width: 100px !important;

    img {
      border-radius: 6px;
      object-fit: cover;
    }
  }
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

</style>
