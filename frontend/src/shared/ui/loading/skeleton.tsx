import { Container } from '@shared/ui/loading/skeleton.style';

interface SekeletonProps {
  width?: number;
  height?: number;
  count?: number;
}

const Skeleton = ({ width = 40, height = 10, count = 1 }: SekeletonProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, idx) => idx).map((idx) => (
        <Container key={idx} width={width} height={height}></Container>
      ))}
    </>
  );
};

export default Skeleton;
