import React from 'react';
import { SimpleGrid } from '@chakra-ui/layout';
import Header from 'components/Shared/Header';
import Banner from 'components/Shared/Banner';

type MainLayoutProps = React.PropsWithChildren<{}>;

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <SimpleGrid rows={3} columns={1} spacingY="20px" m="5%">
            <Header />
            <Banner />
            {children}
        </SimpleGrid>
    );
};

export default MainLayout;
