<script setup lang="ts">
import { ref, computed } from 'vue'
import UserCard from './UserCard.vue'
import initialUsersData from '../data/users.json'
import type { User } from '../types/user'

const users = ref<User[]>(initialUsersData as User[])

const genderFilter = ref<'all' | 'male' | 'female'>('all')
const age18PlusFilter = ref<boolean>(false)
const sortBy = ref<'none' | 'name-asc' | 'name-desc' | 'age-asc' | 'age-desc'>('none')

const filteredAndSortedUsers = computed(() => {
  let result = [...users.value]

  if (genderFilter.value !== 'all') {
    result = result.filter((u) => u.gender === genderFilter.value)
  }

  if (age18PlusFilter.value) {
    result = result.filter((u) => u.dob.age >= 18)
  }

  if (sortBy.value === 'name-asc') {
    result.sort((a, b) => a.name.first.localeCompare(b.name.first))
  } else if (sortBy.value === 'name-desc') {
    result.sort((a, b) => b.name.first.localeCompare(a.name.first))
  } else if (sortBy.value === 'age-asc') {
    result.sort((a, b) => a.dob.age - b.dob.age)
  } else if (sortBy.value === 'age-desc') {
    result.sort((a, b) => b.dob.age - a.dob.age)
  }

  return result
})

const resetFilters = () => {
  genderFilter.value = 'all'
  age18PlusFilter.value = false
  sortBy.value = 'none'
}
</script>

<template>
  <div class="users-container">
    <h2 class="title">Каталог Користувачів</h2>

    <!-- Toolbar з кнопками фільтрації та сортування -->
    <div class="toolbar">
      <div class="filter-group">
        <span class="group-label">Стать:</span>
        <button
          :class="{ active: genderFilter === 'all' }"
          @click="genderFilter = 'all'"
        >
          Всі
        </button>
        <button
          :class="{ active: genderFilter === 'male' }"
          @click="genderFilter = 'male'"
        >
          Чоловіки
        </button>
        <button
          :class="{ active: genderFilter === 'female' }"
          @click="genderFilter = 'female'"
        >
          Жінки
        </button>
      </div>

      <div class="filter-group">
        <span class="group-label">Вік:</span>
        <button
          :class="{ active: !age18PlusFilter }"
          @click="age18PlusFilter = false"
        >
          Всі
        </button>
        <button
          :class="{ active: age18PlusFilter }"
          @click="age18PlusFilter = true"
        >
          18+
        </button>
      </div>

      <div class="filter-group">
        <span class="group-label">Сортування:</span>
        <button
          :class="{ active: sortBy === 'name-asc' }"
          @click="sortBy = 'name-asc'"
        >
          Ім'я ▲
        </button>
        <button
          :class="{ active: sortBy === 'name-desc' }"
          @click="sortBy = 'name-desc'"
        >
          Ім'я ▼
        </button>
        <button
          :class="{ active: sortBy === 'age-asc' }"
          @click="sortBy = 'age-asc'"
        >
          Вік ▲
        </button>
        <button
          :class="{ active: sortBy === 'age-desc' }"
          @click="sortBy = 'age-desc'"
        >
          Вік ▼
        </button>
      </div>

      <button class="reset-btn" @click="resetFilters">
        🔄 Очистити все
      </button>
    </div>

    <!-- Вимога 5: Перевірка порожнього списку -->
    <div v-if="filteredAndSortedUsers.length === 0" class="empty-message">
      Список юзерів пустий
    </div>

    <div v-else class="users-list">
      <UserCard
        v-for="user in filteredAndSortedUsers"
        :key="user.id"
        :user="user"
      />
    </div>
  </div>
</template>

<style scoped>
.users-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  color: #1e293b;
  margin-bottom: 24px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  background: #f8fafc;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.group-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #64748b;
  margin-right: 4px;
}

button {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #334155;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

button:hover {
  background: #f1f5f9;
}

button.active {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.reset-btn {
  background: #ef4444;
  color: #ffffff;
  border-color: #ef4444;
  font-weight: 600;
  margin-left: auto;
}

.reset-btn:hover {
  background: #dc2626;
}

.empty-message {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  color: #64748b;
  font-size: 1.2rem;
  border: 2px dashed #cbd5e1;
}

.users-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
