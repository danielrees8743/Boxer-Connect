import {
  Box,
  Container,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import AddUser from '../../components/accountComponents/AddUser';
import Boxers from '../../components/accountComponents/Boxers';
import Coaches from '../../components/accountComponents/Coaches';

//* Components
import Profile from '../../components/accountComponents/Profile';
import Setting from '../../components/accountComponents/Setting';

export default function AccountHome() {
  return (
    <Container maxW='66%' mt='15px'>
      <Box as='section'>
        <Tabs variant='enclosed'>
          <TabList>
            <Tab _selected={{ color: 'secondary', bg: 'brand.400' }}>
              Boxers
            </Tab>
            <Tab _selected={{ color: 'secondary', bg: 'brand.400' }}>
              Coaches
            </Tab>
            <Tab _selected={{ color: 'secondary', bg: 'brand.400' }}>
              Add Boxer/Coach
            </Tab>
            <Tab _selected={{ color: 'secondary', bg: 'brand.400' }}>
              My Profile
            </Tab>
            <Tab _selected={{ color: 'secondary', bg: 'brand.400' }}>
              Settings
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Boxers />
            </TabPanel>
            <TabPanel>
              <Coaches />
            </TabPanel>
            <TabPanel>
              <AddUser />
            </TabPanel>
            <TabPanel>
              <Profile />
            </TabPanel>
            <TabPanel>
              <Setting />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
