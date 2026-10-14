<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User } from '../types/user'

const props = defineProps<{
  user: User
}>()

const showDetails = ref(false)

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}

const fullName = computed(() => {
  return `${props.user.name.title} ${props.user.name.first} ${props.user.name.last}`
})

// Вимога 4: Об'єктний синтаксис :class для вікових категорій
const ageCategoryClass = computed(() => {
  const age = props.user.dob.age
  return {
    minor: age < 18,
    young: age >= 18 && age <= 30,
    adult: age >= 31 && age <= 50,
    senior: age > 50
  }
})
</script>

<template>
  <div class="user-card" :class="ageCategoryClass">
    <div class="avatar-container">
      <!-- Вимога 5: Динамічний src та alt через v-bind -->
      <img
        :src="user.picture"
        :alt="`Фото користувача ${fullName}`"
        class="user-avatar"
      />
    </div>

    <div class="user-main-info">
      <h3 class="user-name">{{ fullName }}</h3>

      <div class="user-meta">
        <span class="meta-item">
          <i>{{ user.gender === 'female' ? '♀' : '♂' }}</i> {{ user.gender }}
        </span>

        <!-- Вимога 4: v-if (показувати вік тільки якщо > 18) -->
        <span v-if="user.dob.age >= 18" class="meta-item age-badge">
          📅 {{ user.dob.age }} років
        </span>
        <span v-else class="meta-item age-badge minor-badge">
          Неповнолітній (<18)
        </span>
      </div>

      <p class="user-contact"><strong>Location:</strong> {{ user.location.city }}, {{ user.location.country }}</p>
      <p class="user-contact"><strong>Email:</strong> {{ user.email }}</p>
      <p class="user-contact"><strong>Phone:</strong> {{ user.phone }}</p>

      <!-- Вимога 4: v-for для масиву хобі -->
      <div class="hobbies-section">
        <strong>Hobbies:</strong>
        <div class="hobbies-tags">
          <span v-for="(hobby, index) in user.hobbies" :key="index" class="hobby-tag">
            {{ hobby }}
          </span>
        </div>
      </div>

      <button class="toggle-btn" @click="toggleDetails">
        {{ showDetails ? 'Приховати деталі ▲' : 'Показати деталі ▼' }}
      </button>

      <!-- Вимога 4: v-show для додаткових деталей -->
      <div v-show="showDetails" class="details-box">
        <p><strong>About:</strong> {{ user.details }}</p>
        <p><strong>Street:</strong> {{ user.location.street.number }} {{ user.location.street.name }}</p>
        <p><strong>Cell:</strong> {{ user.cell }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  gap: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border-left: 8px solid #ccc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* Кольори категорій віку */
.user-card.minor {
  border-left-color: #e74c3c;
  background-color: #fff8f8;
}

.user-card.young {
  border-left-color: #2ecc71;
  background-color: #f6fff9;
}

.user-card.adult {
  border-left-color: #3498db;
  background-color: #f4f9fc;
}

.user-card.senior {
  border-left-color: #9b59b6;
  background-color: #fcf7ff;
}

.avatar-container {
  flex-shrink: 0;
}

.user-avatar {
  width: 130px;
  height: 130px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #eaeaea;
}

.user-main-info {
  flex-grow: 1;
}

.user-name {
  margin: 0 0 8px 0;
  font-size: 1.3rem;
  color: #2c3e50;
}

.user-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.meta-item {
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
  background: #eee;
  padding: 4px 10px;
  border-radius: 16px;
}

.user-contact {
  margin: 4px 0;
  font-size: 0.92rem;
  color: #444;
}

.hobbies-section {
  margin-top: 10px;
}

.hobbies-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.hobby-tag {
  background-color: #e0f2fe;
  color: #0369a1;
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 6px;
}

.toggle-btn {
  margin-top: 12px;
  background: transparent;
  border: 1px solid #3498db;
  color: #3498db;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: #3498db;
  color: #fff;
}

.details-box {
  margin-top: 10px;
  padding: 10px;
  background: #ffffff;
  border: 1px dashed #cbd5e1;
  border-radius: 6px;
  font-size: 0.88rem;
}
</style>
