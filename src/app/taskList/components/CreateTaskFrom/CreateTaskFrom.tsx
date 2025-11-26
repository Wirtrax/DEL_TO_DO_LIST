import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import styles from './CreateFormStyle.module.css';
import { Checkbox } from 'components/Checkbox';
import { CreateTask } from 'types/tasks';
import { useTasks } from 'src/hooks/useTasks';

const CreateTaskFrom = () => {
  const { createTask, isLoading } = useTasks();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    name: Yup.string().required('Введите название задачи'),
    info: Yup.string().required('Дополните описание'),
    isCompleted: Yup.boolean().default(false),
    isImportant: Yup.boolean().default(false),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTask>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      isCompleted: false,
      isImportant: false,
    },
  });

  const onSubmit = async (data: CreateTask) => {
    try {
      await createTask(data);
      setTimeout(() => {
        navigate('/', {
          state: {
            fromCreate: true,
            success: true,
            message: 'Задача успешно создана',
          },
        });
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        navigate('/', {
          state: {
            fromCreate: true,
            success: false,
            message: 'Ошибка при создании задачи',
          },
        });
      }, 1000);
    }
  };

  return (
    <>
      <h1 className={styles.title}>TODO LIST | CREATE TASK</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <CustomInput
              {...field}
              label="Task name"
              placeholder="Task name..."
              error={errors.name?.message as string}
              type="text"
            />
          )}
        />
        <Controller
          control={control}
          name="info"
          render={({ field }) => (
            <CustomInput
              {...field}
              label="Task info"
              placeholder="Task info..."
              error={errors.info?.message as string}
              type="text"
            />
          )}
        />
        <Controller
          control={control}
          name="isCompleted"
          render={({ field }) => (
            <Checkbox
              {...field}
              label="isCompleted"
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        <Controller
          control={control}
          name="isImportant"
          render={({ field }) => (
            <Checkbox
              {...field}
              label="isImportant"
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />

        <input
          type="submit"
          value={isLoading ? 'Creating...' : 'Create Task'}
          className={`${styles.button} ${styles.primary}`}
          disabled={isLoading}
        />
      </form>
    </>
  );
};

export default CreateTaskFrom;
