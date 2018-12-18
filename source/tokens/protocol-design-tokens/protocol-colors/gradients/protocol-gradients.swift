/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* Protocol Gradients iOS Variables v2.1.0
   From https://github.com/mozilla/protocol-design-tokens/tree/master/protocol-colors#readme */

extension UIColor {
  func grayscaleGradient() {
    let layer : CAGradientLayer = CAGradientLayer()
    layer.frame.size = self.frame.size
    layer.frame.origin = CGPointZero
    layer.cornerRadius = CGFloat(frame.width / 20)

    let color0x000000 = UIColor(0x000000)
    let color0xFFFFFF = UIColor(0xFFFFFF)

    layer.colors = [color0x000000,color0xFFFFFF]
    self.layer.insertSublayer(layer, atIndex: 0)
  }
  func focusGradient() {
    let layer : CAGradientLayer = CAGradientLayer()
    layer.frame.size = self.frame.size
    layer.frame.origin = CGPointZero
    layer.cornerRadius = CGFloat(frame.width / 20)

    let color0x4A1475 = UIColor(0x4A1475)
    let color0x671878 = UIColor(0x671878)
    let color0x8C4248 = UIColor(0x8C4248)
    let color0x82FF27 = UIColor(0x82FF27)

    layer.colors = [color0x4A1475,color0x671878,color0x8C4248,color0x82FF27]
    self.layer.insertSublayer(layer, atIndex: 0)
  },
  func helloworldGradient() {
    let layer : CAGradientLayer = CAGradientLayer()
    layer.frame.size = self.frame.size
    layer.frame.origin = CGPointZero
    layer.cornerRadius = CGFloat(frame.width / 20)

    let color0x4A1475 = UIColor(0x4A1475)
    let color0x671878 = UIColor(0x671878)
    let color0x8C4248 = UIColor(0x8C4248)

    layer.colors = [color0x4A1475,color0x671878,color0x8C4248]
    self.layer.insertSublayer(layer, atIndex: 0)
  },
}
