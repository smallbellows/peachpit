import { Grid, GridItem, Heading } from '@chakra-ui/react';
import title from './title.svg';
const backgroundProps = {
    background: 'teal.400',
    border: '2px solid white',
};
const borderRadius = '13px';

const Banner = () => {
    return (
        <Grid
            templateColumns="1fr 2fr 4fr 2fr 1fr"
            templateRows="0.5fr 0.5fr 1fr"
        >
            <GridItem
                rowStart={3}
                colStart={1}
                rowEnd={4}
                colEnd={2}
                borderTopLeftRadius={borderRadius}
                {...backgroundProps}
            />
            <GridItem
                rowStart={2}
                colStart={2}
                rowEnd={4}
                colEnd={3}
                borderTopLeftRadius={borderRadius}
                {...backgroundProps}
            />
            <GridItem
                rowStart={1}
                colStart={3}
                rowEnd={4}
                colEnd={4}
                sx={{ img: { margin: '30px auto 10px auto', width: '90%' } }}
                borderTopLeftRadius={borderRadius}
                borderTopRightRadius={borderRadius}
                {...backgroundProps}
            >
                <Heading
                    transform="rotate(-13deg)"
                    textColor="gray.500"
                    position="relative"
                    top="0"
                    left="0"
                >
                    Welcome to the
                </Heading>
                <img src={title} alt="Peach Pit" />
            </GridItem>
            <GridItem
                rowStart={2}
                colStart={4}
                rowEnd={4}
                colEnd={5}
                borderTopRightRadius={borderRadius}
                {...backgroundProps}
            />
            <GridItem
                rowStart={3}
                colStart={5}
                rowEnd={5}
                colEnd={6}
                borderTopRightRadius={borderRadius}
                {...backgroundProps}
            />
        </Grid>
    );
};

export default Banner;
