import { FlatList } from 'react-native';

import useAttendance from '@/hooks/useAttendance';

const Attendance = () => {
  const { attendance, listItem, loading, error } = useAttendance();
  return (
    <>
      <FlatList data={attendance} keyExtractor={(item) => item.id} renderItem={listItem} />
    </>
  );
};

export default Attendance;
