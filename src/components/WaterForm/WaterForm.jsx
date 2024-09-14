import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addWater, updateWater } from '../../redux/water/operations';
import css from './WaterForm.module.css';

const schema = yup.object().shape({
  volumeOfWater: yup
    .number()
    .typeError("Enter a valid amount of water")
    .min(50, "Minimum amount is 50 ml")
    .max(500, "Maximum amount is 500 ml")
    .required("Amount is required"),
  time: yup.string().required("Water consumption time is mandatory"),
});

const WaterForm = ({ closeWaterModal, operationType, item }) => {
    const dispatch = useDispatch();

  // Начальные значения формы
  const defaultValues =
    operationType !== 'add' && item
      ? {
          date: item.date,
          time: new Date(item.date).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          waterVolume: item.waterVolume,
        }
      : {
          date: new Date().toISOString(),
          time: new Date().toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          waterVolume: 50,
        };

    // Инициализация useForm с yupResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onChange',
  });     
  // Обновление формы при редактировании записи
  useEffect(() => {
    if (operationType !== 'add' && item) {
      reset({
        date: item.date,
        time: new Date(item.date).toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        waterVolume: item.waterVolume,
      });
    }
  }, [operationType, item, reset]);

  // Отправка данных формы
  const onSubmit = data => {
    const date = new Date(data.date);
    const [hours, minutes] = data.time.split(':');
    date.setHours(hours);
    date.setMinutes(minutes);

    const water = {
      waterVolume: data.waterVolume,
      date: date.toISOString(),
    };

    if (operationType === 'add') {
      dispatch(addWater(water))
        .unwrap()
        .then(() => {
          toast.success('You successfully add a water record!');
          console.log('Add Water:', water);
          closeWaterModal();
        })
        .catch(error => {
          toast.error('Failed to add water record!.');
        });
    } else {
      dispatch(updateWater({ waterId: item._id, ...water }))
        .unwrap()
        .then(() => {
          toast.success('You successfully update a water record!');
          console.log('Edit Water:', water);
          closeWaterModal();
        })
        .catch(error => {
          toast.error('Failed to update water record!');
        });
    }
  };

  // Увеличение объема воды
  const plusWaterVolume = () => {
    const currentAmount = parseInt(getValues('waterVolume'), 10);
    setValue('waterVolume', currentAmount + 10);
    clearErrors('waterVolume');
  };

  // Уменьшение объема воды
  const minusWaterVolume = () => {
    const currentAmount = parseInt(getValues('waterVolume'), 10);
    setValue('waterVolume', Math.max(50, currentAmount - 10));
    clearErrors('waterVolume');
  };

  // Изменение объема воды вручную
  const handleWaterVolumeChange = e => {
    const value = Number(evt.target.value);
    setValue('waterVolume', value);
    if (value >= 50 && value <= 500) {
      clearErrors('waterVolume');
    }
  };
  return (
    <>
      <form className={css.waterForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className={css.text}>Amount of water:</p>
          <div className={css.waterCounter}>
          <button
            type="button"
            className={css.waterCountBtn}
            onClick={minusWaterVolume}
          >
            <CiCircleMinus size={42} />
          </button>
            <div className={css.waterAmount}>ml</div>
            <button
            type="button"
            className={css.waterCountBtn}
            onClick={plusWaterVolume}
          >
            <CiCirclePlus size={42} />
          </button>
          </div>
          {errors.waterVolume && (
          <p className={css.error}>{errors.waterVolume.message}</p>
        )}
        </div>
        <p className={css.text}>Recording time</p>
        <input
        type="time"
        className={css.timeInput}
        {...register('time')}
      />
      {errors.time && <p className={css.error}>{errors.time.message}</p>}

        <p className={css.waterInput}>Enter the value of the water used:</p>
        <input
        type="number"
        className={css.amountInput}
        {...register('waterVolume')}
        onChange={handleWaterVolumeChange}
      />
      {errors.waterVolume && (
        <p className={css.error}>{errors.waterVolume.message}</p>
      )}
        <button className={css.saveBtn} type="submit">
        Save
        </button>
      </form>
    </>
  );
};

export default WaterForm;
