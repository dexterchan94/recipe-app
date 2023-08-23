import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function LoadingSkeletion() {
  return (
    <>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={210} height={60} animation="wave" />
        <br />
        <Skeleton variant="rounded" width={600} height={20} animation="wave" />
        <Skeleton variant="rounded" width={500} height={20} animation="wave" />
        <Skeleton variant="rounded" width={600} height={20} animation="wave" />
        <Skeleton variant="rounded" width={500} height={20} animation="wave" />
        <br />
        <Skeleton variant="rounded" width={600} height={20} animation="wave" />
        <Skeleton variant="rounded" width={500} height={20} animation="wave" />
        <Skeleton variant="rounded" width={600} height={20} animation="wave" />
        <Skeleton variant="rounded" width={500} height={20} animation="wave" />
      </Stack>
    </>
  );
}
