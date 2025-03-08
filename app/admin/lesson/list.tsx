import { Datagrid, List, TextField, ReferenceField, NumberField } from "react-admin";

export const LessonList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="description" />
                <ReferenceField source="unitId" reference="courses" />
                <NumberField source="imageSrc" />  
            </Datagrid>
        </List>
    );
};