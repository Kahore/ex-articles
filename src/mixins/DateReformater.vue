<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class DateReformater extends Vue {
  public reformat(created: Date): string {
    const date = new Date(created);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const mnth = monthNames[date.getMonth()];
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return mnth + ' ' + dd + ' ' + yyyy;
  }
}
</script>
