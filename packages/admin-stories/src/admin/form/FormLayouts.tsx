import { Field, FinalForm, FinalFormInput, FormPaper, FormSection } from "@comet/admin";
import { Box, Grid } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { apolloStoryDecorator } from "../../apollo-story.decorator";

function Story() {
    return (
        <FinalForm mode={"edit"} onSubmit={() => {}}>
            <Box mb={8} maxWidth={1024}>
                <FormPaper variant="outlined">
                    <FormSection title="Vertical Fields" disableMarginBottom>
                        <Field label="Foo" placeholder="Foo" name="foo1" component={FinalFormInput} />
                        <Field label="Bar" placeholder="Bar" name="bar1" component={FinalFormInput} />
                        <Field label="Disabled" placeholder="Disabled" name="disabled1" disabled component={FinalFormInput} />
                        <Field label="Required" placeholder="Required" name="required1" required component={FinalFormInput} />
                    </FormSection>
                </FormPaper>
            </Box>
            <Box mb={8} maxWidth={1024}>
                <FormPaper variant="outlined">
                    <FormSection title="Horizontal Fields" disableMarginBottom>
                        <Field label="Foo" placeholder="Foo" name="foo2" component={FinalFormInput} variant={"horizontal"} />
                        <Field label="Bar" placeholder="Bar" name="bar2" component={FinalFormInput} variant={"horizontal"} />
                        <Field label="Disabled" placeholder="Disabled" name="disabled2" disabled component={FinalFormInput} variant={"horizontal"} />
                        <Field label="Required" placeholder="Required" name="required2" required component={FinalFormInput} variant={"horizontal"} />
                    </FormSection>
                </FormPaper>
            </Box>
            <Box mb={8} maxWidth={1024}>
                <FormPaper variant="outlined">
                    <FormSection title="Fields in Grid" disableMarginBottom>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Field label="Foo" placeholder="Foo" name="foo3" fullWidth component={FinalFormInput} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Field label="Bar" placeholder="Bar" name="bar3" fullWidth component={FinalFormInput} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Field label="Disabled" placeholder="Disabled" name="disabled3" disabled fullWidth component={FinalFormInput} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Field label="Required" placeholder="Required" name="required3" required fullWidth component={FinalFormInput} />
                            </Grid>
                        </Grid>
                    </FormSection>
                </FormPaper>
            </Box>
        </FinalForm>
    );
}

storiesOf("@comet/admin/form", module)
    .addDecorator(apolloStoryDecorator())
    .add("Form Layouts", () => <Story />);
