<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <teams-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></teams-item>
    </ul>
  </section>
</template>

<script>
import TeamsItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  components: {
    TeamsItem
  },
  data() {
    return {
      teamName: '',
      members: [],
      // teamName: 'Test',
      // members: [
      //   { id: 'u1', fullName: 'Max Schwarz', role: 'Engineer' },
      //   { id: 'u2', fullName: 'Max Schwarz', role: 'Engineer' },
      // ],
    };
  },
  created(){
    //this.$route.path // /teams/t1
    const teamId = this.$route.params.teamId;
    const selectedTeam = this.teams.find(team => team.id === teamId);
    const members = selectedTeam.members;
    const selectedMembers = [];
    for(const member of members){
      const selectedUser = this.users.find(user => user.id === member);
      selectedMembers.push(selectedUser);
    }
    this.members = selectedMembers;
    this.teamName = selectedTeam.name;
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>