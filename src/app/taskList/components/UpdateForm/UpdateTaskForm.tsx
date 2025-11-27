import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import styles from './UpdateFormStyle.module.css';
import { Checkbox } from 'components/Checkbox';
import { useTasks } from 'src/hooks/useTasks';
import { Loader } from 'components/Loader';
import { Task } from 'types/tasks';

const UpdateFrom = () => {
  const { id } = useParams<{ id: string }>();
  const { getOneTask, updateTask, currentTask, isLoading, error } = useTasks();

  const schema = Yup.object().shape({
    name: Yup.string().required('Введите название задачи'),
    info: Yup.string().required('Дополните описание'),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      info: '',
      isCompleted: false,
      isImportant: false,
    },
  });

  useEffect(() => {
    if (id) {
      getOneTask(id);
    }
  }, [getOneTask, id]);

  useEffect(() => {
    if (currentTask) {
      reset({
        name: currentTask.name || '',
        info: currentTask.info || '',
        isCompleted: currentTask.isCompleted ?? false,
        isImportant: currentTask.isImportant ?? false,
      });
    }
  }, [currentTask, reset]);

  const onSubmit = (data: Task) => {
    if (id) {
      updateTask(Number(id), data);
    }
  };
  if (error && Object.keys(error).length > 0) {
    return (
      <div className={styles.form}>
        <div className={styles.errorContainer}>
          <h2>Задача не найдена</h2>
          <p>Данная задача была удалена или не существует.</p>
        </div>
      </div>
    );
  }
  return (
    <Loader isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {id && <p>UPDATE TASK ID: {id}</p>}

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
              checked={field.value}
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
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />

        <input
          type="submit"
          value={isLoading ? 'Update Task...' : 'Update Task'}
          className={`${styles.button} ${styles.primary}`}
          disabled={isLoading}
        />
      </form>
    </Loader>
  );
};

export default UpdateFrom;
