import { SpinnerWrapper } from '@shared/ui/loading/spinner.style';

import LoadingSpinner from '@icons/horizontal-loading.svg?react';

interface SpinnerProps {
  width?: number;
  height?: number;
}

const Spinner = ({ width = 0, height = 0 }: SpinnerProps) => {
  return (
    <SpinnerWrapper width={width} height={height}>
      <LoadingSpinner />
    </SpinnerWrapper>
  );
};

export default Spinner;
