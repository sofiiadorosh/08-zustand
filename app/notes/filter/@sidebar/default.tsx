import { NOTE_TAGS } from '@/types/note';
import SidebarNotes from './SidebarNotes';

function SidebarDefault() {
  return <SidebarNotes tags={NOTE_TAGS} />;
}

export default SidebarDefault;
