import Image from 'next/image'
import styles from '../styles/ProductThumbnail.module.css'

const ProductThumbnail = (props) => {
    return (
        <div className={styles.thumbnailContainer}>
            <Image 
                src={`https://${props.img.fields.file.url}`} 
                width={props.img.fields.file.details.image.width}
                height={props.img.fields.file.details.image.height} />
            <h2>{props.brandName}</h2>
            <p>{props.productName}</p>
            <p>{props.price}</p>
        </div>
    )
}
export default ProductThumbnail;