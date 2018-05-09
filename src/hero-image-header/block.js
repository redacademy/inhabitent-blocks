/**
BLOCK: hero-image-header
 *
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import icons from './icons';

const { __ } = wp.i18n;
const { MediaUpload, registerBlockType } = wp.blocks;
const { Button, Spinner, withAPIData } = wp.components;

class HeroImageHeader {
	title = __( 'Hero Image Header' );

	icon = 'awards';

	category = 'formatting';

	keywords = [ __( 'hero' ), __( 'image' ), __( 'header' ) ];

	useOnce = true;

	attributes = {
		imgID: {
			type: 'number',
		},
	};

	// The edit function describes the structure of your block in the context of the editor.
	// This represents what the editor will render when the block is used.
	//
	// @TODO Uses global var from wp_localize_script until a better option is available.
	//
	// @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	edit = withAPIData( ( props, { type } ) => ( {
		post: `/wp/v2/${type(props.postType)}/${post_data.postId}`, // eslint-disable-line
		heroImage: `/wp/v2/media/${ props.attributes.imgID }`,
	} ) )(
		( {
			post,
			heroImage,
			attributes: { imgID },
			className,
			setAttributes,
			isSelected,
		} ) => {
			const onSelectImage = img => {
				setAttributes( {
					imgID: img.id,
				} );
			};
			const onRemoveImage = () => {
				setAttributes( {
					imgID: null,
				} );
			};

			console.log( heroImage );

			if ( ! imgID ) {
				return (
					<div className={ className }>
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ imgID }
							render={ ( { open } ) => (
								<Button className={ 'button button-large' } onClick={ open }>
									{ icons.upload }
									{ __( 'Add Hero Image' ) }
								</Button>
							) }
						/>
					</div>
				);
			}

			if ( heroImage.isLoading || 'undefined' === typeof heroImage.data ) {
				return <Spinner />;
			}

			return (
				<div>
					<div
						className={ className }
						style={ {
							background: `linear-gradient( to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100% ), url(${
								heroImage.data.media_details.sizes.large.source_url
							}) no-repeat center bottom`,
							backgroundSize: 'cover, cover',
						} }
					>
						<div className="image-wrapper">
							<div className="entry-title-preview">
								{ post.isLoading || 'undefined' === typeof post.data ? (
									<h1>Loading title...</h1>
								) : (
									<h1>{ post.data.title.rendered }</h1>
								) }
							</div>

							{ isSelected ? (
								<Button className="remove-image" onClick={ onRemoveImage }>
									{ icons.remove }
								</Button>
							) : null }
						</div>
					</div>
					<small>
						Above hero image title text is for preview purposes only.
					</small>
				</div>
			);
		}
	);

	// The save function defines the way in which the different attributes should be combined
	// into the final markup, which is then serialized by Gutenberg into post_content.
	//
	// @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	save = () => {
		return null;
	};
}

registerBlockType( 'inhabitent/hero-image-header', new HeroImageHeader() );
