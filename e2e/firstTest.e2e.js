describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  
  it('should show component correctly',async () => {
    const taskView = await element(by.id('task_view'));
    const textInput = await element(by.id('task_input'));
    await expect(taskView).toBeVisible();
    await expect(textInput).toBeVisible();
  });

  it('should create an item task', async () => {
    const textInput = await element(by.id('task_input'));
    const itemText = 'Testing with Detox';

    await textInput.typeText(itemText);
    await element(by.id('task_add')).tap();

    await expect(element(by.text(itemText))).toExist();
  });

  it('Should create multiple items', async () => {
    const textInput = await element(by.id('task_input'));
    const itemTextOne = 'Testing One Taks';
    const itemTextTwo = 'Testing Two Task';

    await textInput.typeText(itemTextOne);
    await element(by.id('task_add')).tap();
    await textInput.typeText(itemTextTwo);
    await element(by.id('task_add')).tap();

    await expect(element(by.text(itemTextOne))).toExist();
    await expect(element(by.text(itemTextTwo))).toExist();
  });
  
  it('Should delete an item', async () => {
    const textInput = await element(by.id('task_input'));
    const itemText = 'Testing with Detox';
    const itemTextId = itemText.split(' ').join('').toLowerCase();

    await textInput.typeText(itemText);
    await element(by.id('task_add')).tap();

    await expect(element(by.id(itemTextId))).toExist();

    await element(by.id(itemTextId)).tap();
    await element(by.id(itemTextId)).tap();

    await textInput.typeText('otro');
    await element(by.id('task_add')).tap();

    await expect(element(by.id('otro'))).toBeVisible();
    
    await element(by.id('otro')).tap();
    await element(by.id('otro')).tap();

    await expect(element(by.id('task_remove'))).toNotExist();
    await expect(element(by.id('otro'))).toNotExist();
  });
  
  it('Should display an error when trying to create an item without any text', async () => {
    const taskView = await element(by.id('task_view'));
    await expect(taskView).toBeVisible();

    await element(by.id('task_add')).tap();
    await expect(element(by.text('Please insert a valid text'))).toBeVisible();
  })
  
  it('Should remove the error message after creating a valid item', async () => {
    const taskView = await element(by.id('task_view'));
    await expect(taskView).toBeVisible();

    await element(by.id('task_add')).tap();

    const textInput = await element(by.id('task_input'));
    const itemText = 'Testing with Detox';

    await textInput.typeText(itemText);
    await element(by.id('task_add')).tap();

    
    await expect(element(by.text('Please insert a valid text'))).toBeNotVisible();
  })
  
});
