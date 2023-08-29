<script>
    import { Drawer, Button, CloseButton, Sidebar, SidebarBrand, SidebarCta, SidebarDropdownItem, SidebarDropdownWrapper, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
    import { Icon } from 'flowbite-svelte-icons';
    import { sineIn } from 'svelte/easing';
    let hidden2 = true;
    let spanClass = 'flex-1 ml-3 whitespace-nowrap';
    let transitionParams = {
      x: -320,
      duration: 200,
      easing: sineIn
    };
  </script>
  
  <div class="text-center">
    <Button on:click={() => (hidden2 = false)}>Show navigation</Button>
  </div>
  <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2">
    <div class="flex items-center">
      <h5 id="drawer-navigation-label-3" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
      <CloseButton on:click={() => (hidden2 = true)} class="mb-4 dark:text-white" />
    </div>
    <Sidebar>
      <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
        <SidebarGroup>
          <SidebarItem label="Dashboard">
            <svelte:fragment slot="icon">
              <Icon name="chart-pie-solid" class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarDropdownWrapper label="E-commerce">
            <svelte:fragment slot="icon">
              <Icon name="shopping-cart-solid" class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            <SidebarDropdownItem label="Products" />
            <SidebarDropdownItem label="Billing" />
            <SidebarDropdownItem label="Invoice" />
          </SidebarDropdownWrapper>
          <SidebarItem label="Kanban" {spanClass}>
            <svelte:fragment slot="icon">
              <Icon name="grid-solid" class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            <svelte:fragment slot="subtext">
              <span class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"> Pro </span>
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Inbox" {spanClass}>
            <svelte:fragment slot="icon">
              <Icon name="mail-box-solid" class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            <svelte:fragment slot="subtext">
              <span class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Users">
            <svelte:fragment slot="icon">
              <Icon name="users-solid" class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Products">
            <svelte:fragment slot="icon">
              <Icon name="bag-solid" class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Sign In">
            <svelte:fragment slot="icon">
              <Icon name="arrow-right-to-bracket-solid" class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Sign Up">
            <svelte:fragment slot="icon">
              <Icon name="file-edit-solid" class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
  </Drawer>