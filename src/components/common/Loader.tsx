import { Box, LinearProgress } from '@mui/material';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const PageLoaderWrapper = styled('div')({
    position: 'fixed',
    top     : 0,
    left    : 0,
    zIndex  : 1301,
    width   : '100%'
});

const SectionLoaderWrapper = styled(Box)({
    position : 'absolute',
    top      : '50%',
    left     : '50%',
    transform: 'translate(-50%, -70%)',
    zIndex   : 1301,
});

const ComponentLoaderWrapper = styled(Box)({
    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center',
});

const ComponentLoader = ({size = 'md'}) => {
    let height = '20vh';

    if (size === 'sm') {
        height = '10vh';
    } else if (size === 'lg') {
        height = '30vh';
    } else if (size === 'xl') {
        height = '50vh';
    }

    return (
        <ComponentLoaderWrapper height={height}>
            <Box position={'relative'}>
                <CircularProgress variant="determinate" size={100} thickness={3} value={100}
                                  sx={{color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]}}/>
                <CircularProgress variant="indeterminate" disableShrink
                                  sx={{
                                      color                                   : (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                                      animationDuration                       : '700ms',
                                      position                                : 'absolute',
                                      left                                    : 0,
                                      [`& .${circularProgressClasses.circle}`]: {
                                          strokeLinecap: 'round',
                                      },
                                  }} size={100} thickness={2}/>
            </Box>
        </ComponentLoaderWrapper>
    );
};

// ==============================|| LOADER ||============================== //
const PageLoader = () => <PageLoaderWrapper><LinearProgress color="primary"/></PageLoaderWrapper>;

const SectionLoader = () => {
    return (
        <SectionLoaderWrapper>
            <Box sx={{position: 'relative'}}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: (theme) =>
                            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    }}
                    size={100}
                    thickness={3}
                    value={100}
                />
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color                                   : (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                        animationDuration                       : '700ms',
                        position                                : 'absolute',
                        left                                    : 0,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                    size={100}
                    thickness={2}
                />
            </Box>
        </SectionLoaderWrapper>
    );
};

export {
    SectionLoader,
    PageLoader,
    ComponentLoader
};