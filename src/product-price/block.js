/**
BLOCK: product-price
 *
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, TextControl } = wp.components;

class ProductPrice {
	title = __( 'Product Price' );

	icon = 'cart';

	category = 'formatting';

	keywords = [ __( 'product' ), __( 'price' ) ];

	attributes = {
		price: {
			type: 'string',
			source: 'meta',
			meta: 'price',
		},
	};

	// The edit function describes the structure of your block in the context of the editor.
	// This represents what the editor will render when the block is used.
	//
	// @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	edit = ( { attributes: { price }, className, setAttributes, isSelected } ) => {
		return (
			<Fragment>
				{ isSelected && (
					<InspectorControls>
						<PanelBody>
							<TextControl
								label={ __( 'Product Price' ) }
								value={ price }
								onChange={ value => setAttributes( { price: value } ) }
								className="wp-block-inhabitent-blocks-product-price-meta"
								help={ __(
									'Enter a price with a dollar sign and cents (e.g. $25.00).'
								) }
							/>
						</PanelBody>
					</InspectorControls>
				) }
				<div className={ className }>
					{ price ? (
						<p>{ price }</p>
					) : (
						<p className="no-price">
							{ __( 'Enter the price in the Block Settings.' ) }
						</p>
					) }
				</div>
			</Fragment>
		);
	};

	// The save function defines the way in which the different attributes should be combined
	// into the final markup, which is then serialized by Gutenberg into post_content.
	//
	// @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	save = () => {
		return null;
	};
}

registerBlockType( 'inhabitent/product-price', new ProductPrice() );
