<script>
import {validateCollection} from "@/utils/validators";

export default {
  name: "BaseTable",
  props: {
    data: {
      type: Array,
      required: true,
    },
    columnsConfig: {
      type: Array,
      required: true,
      validator: validateCollection({title: 'string', key: 'string', slot: 'boolean'})
    },
  },

}
</script>

<template>
  <v-card
      elevation="2"
      outlined
  >
    <table class="base-table">
      <thead>
      <tr class="base-table__head-row">
        <th v-for="col in columnsConfig" :key="col.title" class="base-table__head-cell">
          <span class="base-table__head-label">{{ col.title }}</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in data" :key="item.id" class="base-table__row">
        <td v-for="col in columnsConfig" :key="col.key" class="base-table__cell">
          <div class="base-table__cell-content">
            <span v-if="!col.slot">{{ item[col.key] }}</span>
            <slot v-else :name="col.key" :row="item"></slot>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </v-card>
</template>

<style lang="scss" scoped>
.base-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: var(--color-title);
  position: relative;
  table-layout: fixed;

  thead {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 3;
  }

  &__head-row {
    background-color: var(--color-primary-light);
  }

  &__head-cell,
  &__cell {
    padding: 0 1rem;
    text-align: left;
    vertical-align: middle;
  }

  &__head-cell {
    height: 56px;
    border-bottom: 1px solid var(--color-border-subtle);
  }

  &__head-label {
    display: inline-flex;
    align-items: center;
    min-height: 100%;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-title);
  }

  &__row {
    transition: background-color 0.18s ease;

    &:hover {
      background-color: var(--color-surface-hover);
    }

    &:last-child {
      .base-table__cell {
        border-bottom: none;
      }
    }
  }

  &__cell {
    border-bottom: 1px solid var(--color-border-subtle);
  }

  &__cell-content {
    display: flex;
    align-items: center;
    min-height: 3.5rem;
    color: var(--color-text);
  }
}
</style>
