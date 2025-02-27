import * as Tabs from '@radix-ui/react-tabs';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <span>User logged in</span>
            <Tabs.Root className={styles.TabsRoot} defaultValue="tab1">
                <Tabs.List className={styles.TabsList} aria-label="Manage your account">
                    <Tabs.Trigger className={styles.TabsTrigger} value="tab1">
                        Overview
                    </Tabs.Trigger>
                    <Tabs.Trigger className={styles.TabsTrigger} value="tab2">
                        Payment methods
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className={styles.TabsContent} value="tab1">
                    <div>Overview</div>
                </Tabs.Content>
                <Tabs.Content className={styles.TabsContent} value="tab2">
                    <div>Payment methods</div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
};
