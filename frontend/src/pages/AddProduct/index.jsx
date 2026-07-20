
import styles from './addproduct.module.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { selectIsAuth } from "../../redux/slices/auth";

//import 'easymde/dist/easymde.min.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../Axios';
export const AddProduct = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [img_url, setImg_url] = React.useState('');
    const [is_available, setIs_available] = React.useState(true);
    const [category_id, setCategory_id] = React.useState('');
    const [variant, setVariant] = React.useState('');
    const isAuth = useSelector(selectIsAuth);
    const inputFileRef = React.useRef(null);
    const isEditing = Boolean(id);


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
                variant
            }
            const {data} = isEditing ? await instance.patch(`api/products/${id}`, fields) : await instance.post('api/products', fields)

            const id = isEditing ? id : data.id;
            navigate(`/products/${id}`);
            
        }catch(err){
            console.log(err)
            alert('Ошибка при создании файла');
        }
    }
    React.useEffect(() =>{
        if(id){
            instance.get(`api/products/${id}`).then((data) => {
                setName(data.name)
                setDescription(data.description)
                setImg_url(data.img_url)
                setIs_available(data.is_available)
                setCategory_id(data.category_id)
                setVariant(data.variant);
            }).catch((err) => {
                console.log(err)
                alert('Ошибка при получения данных с сервера');
            });
        }
    },[])

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
if(!isAuth){
    return <Navigate to ='/'/>
}
return(
 <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить фото
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {img_url && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
        <img className={styles.image} src={`http://localhost:5174/api${img_url}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={name}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" fullWidth

      value={description}
      onChange={(e) => setTags(e.target.value)} />
      <SimpleMDE className={styles.editor} value={name} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        
          <Button size="large" onClick={() => navigate('/')}>Отмена</Button>
        
      </div>
    </Paper>
  );
};
