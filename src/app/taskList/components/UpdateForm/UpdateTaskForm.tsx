import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import styles from './UpdateFormStyle.module.css';
import { Checkbox } from 'components/Checkbox';

const UpdateFrom = () => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Введите название задачи'),
    info: Yup.string().required('Дополните описание'),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit = (data: any) => console.log(data);
  return (
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
        render={({ field }) => <Checkbox {...field} label="isCompleted" checked={false} />}
      />
      <Controller
        control={control}
        name="isImported"
        render={({ field }) => <Checkbox {...field} label="isImported" checked={false} />}
      />

      <input type="submit" value="Update Task" className={`${styles.button} ${styles.primary}`} />
    </form>
  );
};

export default UpdateFrom;
