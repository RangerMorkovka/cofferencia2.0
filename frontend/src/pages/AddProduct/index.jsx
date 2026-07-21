
import styles from './addproduct.module.css';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { selectIsAuth } from "../../redux/slices/auth";
import { fetchCategories } from "../../redux/slices/categories";
//import 'easymde/dist/easymde.min.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../Axios';
export const AddProduct = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [img_url, setImg_url] = React.useState('');
    const [is_available, setIs_available] = React.useState(true);
    const [category_id, setCategory_id] = React.useState('');
    const { items: categories, status: categoriesStatus } = useSelector(
       (state) => state.categories.categories,
     );
    const [variants, setVariants] = React.useState([ { id: Date.now(), volume: '', price: '' }]);
    const isAuth = useSelector(selectIsAuth);
    const inputFileRef = React.useRef(null);
    const isEditing = Boolean(id);

  const handleVariantChange = (variantId, field, value) => {
    setVariants(prev => prev.map(item => 
      item.id === variantId ? { ...item, [field]: value } : item
    ));
  };

  const handleAddVariant = () => {
    setVariants(prev => [...prev, { id: Date.now(), volume: '', price: '' }]);
  };

  const handleRemoveVariant = (variantId) => {
    if (variants.length === 1) {
      alert("У товара должен быть хотя бы один вариант объема и цены!");
      return;
    }
    setVariants(prev => prev.filter(item => item.id !== variantId));
  };
    const handleChangeFile = async(event) =>{
        try{
            const formData = new FormData();
            const file = event.target.files[0];
            console.log(file);
            formData.append('image', file);
            const {data} = await instance.post('api/uploads/images', formData);
            setImg_url(data.img_url);
            console.log(data);
        } catch (err) {
            console.log(err);
            alert('Ошибка при загрузке файла');

        }
    };
    const onClickRemoveImage = () => {
        setImg_url('')
    };
    const onChange = React.useCallback((value) => {
    setDescription(value);
  }, []);
    const onSubmit = async () => {

        try{

            setIsLoading(true)
            const fields = {
                name,
                description,
                img_url,
                is_available,
                category_id,
                variants
            }
            const {data} = isEditing ? await instance.patch(`api/products/${id}`, fields) : await instance.post('api/products', fields)

            const id = isEditing ? id : data.id;
            navigate(`/admin`);
            
        }catch(err){
            console.log(err)
            alert('Ошибка при создании файла');
        }
    }

    useEffect(() => {
      instance.get('/api/categories').then((data) => {
         dispatch(fetchCategories());
        console.log(categories);
       
    },[dispatch])
        
        
    .catch((err) => {
        console.error(err);
        alert('Не удалось загрузить категории для списка');
      });
  }, []);
    
    React.useEffect(() =>{
        if(id){
            instance.get(`api/products/${id}`).then((data) => {
                setName(data.name)
                setDescription(data.description)
                setImg_url(data.img_url)
                setIs_available(data.is_available)
                setCategory_id(data.category_id)
                
                if (data.variants && data.variants.length > 0) {
          setVariants(data.variants);
                }
            }).catch((err) => {
                console.log(err)
                alert('Ошибка при получения данных с сервера');
            });
        }
    },[id])

     const options = React.useMemo(
    () => ({
      spellchecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: id ? `post-${id}` : 'new-post'
      },
    }),
    [],
  );

return(
  <div className={styles.formContainer}>
 <div className={styles.container}>
  <div className={styles.dataControls}>
    <div className={styles.textControls}> 
       <div className={styles.selectWrapper}>
              <select 
                value={category_id} 
                onChange={(e) => setCategory_id(e.target.value)}
                className={styles.categorySelect}
                required
              >
                <option value="" disabled>Выберите категорию товара</option>
                {Array.isArray(categories) && categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
      <input
        type='text'
        placeholder='Наименование'
        value={name}
        onChange={(e) => setName(e.target.value)}
       
      />
       <input 
              type='text' 
              placeholder='Описание' 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
<input 
                type='checkbox' 
                checked={is_available} 
                onChange={(e) => setIs_available(e.target.checked)} 
              />
              
              <div className={styles.variants}>
              <button type="button" className={styles.addVariantBtn} onClick={handleAddVariant}>
              + Добавить вариант
            </button>
             <div className={styles.variantsList}>
            {variants.map((v) => (
              <div key={v.id} className={styles.variantRow}>
                <input
                  type="text"
                  placeholder="Объём, мл"
                  value={v.volume}
                  onChange={(e) => handleVariantChange(v.id, 'volume', e.target.value)}
                  className={styles.variantInput}
                />
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Цена (руб.)"
                  value={v.price}
                  onChange={(e) => handleVariantChange(v.id, 'price', e.target.value)}
                  className={styles.variantInput}
                />
                <button 
                  type="button" 
                  className={styles.deleteVariantBtn} 
                  onClick={() => handleRemoveVariant(v.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
       </div>
       </div>
  
     <div className={styles.imgControls}>
    <div className={styles.imgActions} >
      <button className={`${styles.btn} ${styles.upload}`} onClick={() => inputFileRef.current.click()}>
        Изображение:
      </button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      
      {img_url && (
        
        <button className={`${styles.btn} ${styles.remove}`} variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </button>)}
        </div>
     
        <div >
        <img className={styles.img} src={`/api${img_url}`} alt="Uploaded" />
        </div>
        
        
      </div>
     
     
 </div>
     
      <div className={styles.formActions}>
        <button className={`${styles.btn} ${styles.save}`} onClick={onSubmit} size="large" variant="contained">
          Сохранить
        </button>
        
          <button className={`${styles.btn} ${styles.cancel}`} size="large" onClick={() => navigate('/')}>Отмена</button>
        
      </div>
    </div>
    </div>
  );
};
