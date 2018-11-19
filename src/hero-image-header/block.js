/**
BLOCK: hero-image-header
 *
 */

import './style.scss';
import './editor.scss';

import icons from './icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload } = wp.editor;
const { Button, Spinner } = wp.components;
const { apiFetch } = wp;
const { registerStore, withSelect } = wp.data;

// https://wordpress.org/gutenberg/handbook/packages/packages-data/#registering-a-store
const DEFAULT_STATE = {
	heroImage: {},
};

const actions = {
	fetchFromApi( path ) {
		return {
			type: 'FETCH_FROM_API',
			path,
		};
	},
	setHeroImage( heroImage, imgID ) {
		return {
			type: 'SET_HERO_IMAGE',
			heroImage,
			imgID,
		};
	},
};

registerStore( 'inhabitent/hero-images', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_HERO_IMAGE':
				return {
					...state,
					heroImage: {
						...state.heroImage,
						[ action.imgID ]: action.heroImage,
					},
				};
		}
		return state;
	},
	actions,
	selectors: {
		getHeroImage( state, imgID ) {
			return state.heroImage[ imgID ];
		},
	},
	controls: {
		FETCH_FROM_API( action ) {
			return apiFetch( { path: action.path } );
		},
	},
	resolvers: {
		*getHeroImage( imgID ) {
			if ( ! imgID ) {
				return actions.setHeroImage( {}, null );
			}
			const path = `/wp/v2/media/${ imgID }`;
			const heroImage = yield actions.fetchFromApi( path );
			return actions.setHeroImage( heroImage, imgID );
		},
	},
} );

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

	edit = withSelect( function( select, { attributes: { imgID } } ) {
		return {
			title: select( 'core/editor' ).getEditedPostAttribute( 'title' ),
			heroImage: select( 'inhabitent/hero-images' ).getHeroImage( imgID ),
		};
	} )(
		( {
			title,
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
			if (
				'undefined' === typeof heroImage ||
				'undefined' === typeof heroImage.media_details
			) {
				return <Spinner />;
			}

			return (
				<div>
					<div
						className={ className }
						style={ {
							background: `linear-gradient( to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100% ), url(${
								heroImage.media_details.sizes.large.source_url
							}) no-repeat center bottom`,
							backgroundSize: 'cover, cover',
						} }
					>
						<div className="image-wrapper">
							<div className="entry-title-preview">
								{ title ? <h1>{ title }</h1> : <h1>Loading title...</h1> }
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
